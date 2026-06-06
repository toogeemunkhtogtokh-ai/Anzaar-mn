import { NextResponse } from "next/server";
import db from "../../../../Lib/db";

export async function GET(req, { params }) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM news WHERE id = ?",
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      article: rows[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    await db.query(
      `
      UPDATE news
      SET
        title = ?,
        seo_title = ?,
        summary = ?,
        content = ?,
        author = ?,
        image = ?,
        tags = ?,
        status = ?,
        category_id = ?,
        is_featured = ?,
        is_wide = ?
      WHERE id = ?
      `,
      [
        body.title,
        body.seoTitle,
        body.excerpt,
        body.content,
        body.author,
        body.image,
        body.tags,
        body.status,
        body.category,
        body.featured ? 1 : 0,
        body.wide ? 1 : 0,
        params.id,
      ]
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}