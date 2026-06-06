import { NextResponse } from "next/server";
import db from "../../../Lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let sql = `
      SELECT
        n.*,
        c.name AS category_name,
        c.slug AS category_slug
      FROM news n
      LEFT JOIN categories c ON c.id = n.category_id
    `;

    const params = [];

    if (category) {
      sql += ` WHERE c.slug = ? `;
      params.push(category);
    }

    sql += ` ORDER BY n.id DESC`;

    const [rows] = await db.query(sql, params);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}