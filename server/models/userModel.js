import db from "../config.js" ;


export async function findByUsername(username) {
    const [rows] = await db.execute (
        `SELECT id , username, password_hash, is_active
        from users
        WHERE username = ?
        LIMIT 1`,
        [username]
    );

    return rows[0] ?? null;

}
