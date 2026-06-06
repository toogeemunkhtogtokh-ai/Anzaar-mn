import { NextResponse } from "next/server";
import db from "../../../../Lib/db";

import fs from "fs/promises";
import path from "path";

const categoryMap = {
  niigem: 1,
  ediinzasag: 2,
  erhzui: 3,
  eruulmend: 4,
  bolovsrol: 5,
  setgelzui: 6,
  sport: 7,
  soyol: 8,
};

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const seoTitle = formData.get("seoTitle");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const category = formData.get("category");
    const status = formData.get("status");
    const featured = formData.get("featured");
    const wide = formData.get("wide");
    const author = formData.get("author");
    const tags = formData.get("tags");

    const image = formData.get("image");

    let imagePath = "";

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "news"
      );

      await fs.mkdir(uploadDir, {
        recursive: true,
      });

      const fileName =
        Date.now() +
        "-" +
        image.name.replace(/\s+/g, "-");

      await fs.writeFile(
        path.join(uploadDir, fileName),
        buffer
      );

      imagePath = `/news/${fileName}`;
    }

    const [result] = await db.query(
      `
      INSERT INTO news
      (
        title,
        seo_title,
        summary,
        content,
        category_id,
        status,
        is_featured,
        is_wide,
        author,
        tags,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        seoTitle,
        excerpt,
        content,
        categoryMap[category],
        status,
        featured === "1" ? 1 : 0,
        wide === "1" ? 1 : 0,
        author,
        tags,
        imagePath,
      ]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId,
      image: imagePath,
    });
  } catch (error) {
  console.error("CREATE NEWS ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error: error.message,
      stack: String(error),
    },
    { status: 500 }
  );
}
}