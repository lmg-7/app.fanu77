import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Body parser for JSON
  app.use(express.json());

  // API Route: Verify email with Systeme.io
  app.post("/api/verify-email", async (req, res) => {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "الرجاء إدخال بريد إلكتروني صالح."
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const apiKey = process.env.SYSTEME_IO_API_KEY;

    // Check if API key is configured
    if (!apiKey) {
      console.warn("SYSTEME_IO_API_KEY is not set in environment variables.");
      return res.status(400).json({
        success: false,
        error: "MISSING_API_KEY",
        message: "عفواً، لم يتم العثور على اشتراك مرتبط بهذا البريد الإلكتروني. يرجى الاشتراك أولاً للتمكن من الوصول."
      });
    }

    try {
      // Query Systeme.io API to search for the contact by email
      // contactEmail is the official filter parameter for contacts in Systeme.io
      const apiUrl = `https://api.systeme.io/api/contacts?contactEmail=${encodeURIComponent(trimmedEmail)}`;
      
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-API-Key": apiKey,
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Systeme.io API error response:", response.status, errorText);
        
        // If API key is invalid/unauthorized (401/403)
        if (response.status === 401 || response.status === 403) {
          return res.status(400).json({
            success: false,
            error: "INVALID_API_KEY",
            message: "عفواً، تعذر إتمام التحقق من الاشتراك حالياً. يرجى التأكد من البريد الإلكتروني أو الاشتراك أولاً."
          });
        }

        throw new Error(`Systeme.io API returned status ${response.status}`);
      }

      const data: any = await response.json();
      console.log("Systeme.io API response for:", trimmedEmail, data);

      // Robust check for contact email in various possible formats returned by Systeme.io API
      let verified = false;
      if (Array.isArray(data)) {
        verified = data.some((item: any) => item?.email?.toLowerCase() === trimmedEmail);
      } else if (data && Array.isArray(data.items)) {
        verified = data.items.some((item: any) => item?.email?.toLowerCase() === trimmedEmail);
      } else if (data && Array.isArray(data.contacts)) {
        verified = data.contacts.some((item: any) => item?.email?.toLowerCase() === trimmedEmail);
      } else if (data && typeof data === "object") {
        // If it's a single contact object or direct match
        verified = data.email?.toLowerCase() === trimmedEmail;
      }

      if (verified) {
        return res.json({
          success: true,
          verified: true,
          message: "تم التحقق بنجاح! البريد الإلكتروني مسجل."
        });
      } else {
        return res.json({
          success: true,
          verified: false,
          message: "هذا البريد الإلكتروني غير مسجل في قائمة المشتركين لدينا."
        });
      }
    } catch (error: any) {
      console.error("Error verifying email with Systeme.io:", error);
      return res.status(500).json({
        success: false,
        message: "حدث خطأ أثناء الاتصال بخادم التحقق من الاشتراك. الرجاء المحاولة لاحقاً."
      });
    }
  });

  // Serve Vite in development, static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production files from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
