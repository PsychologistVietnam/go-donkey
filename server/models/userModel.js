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


//tim tai khoang bang ID 

export async function findByID(userID) {
    const [rows] = await db.execute (
        `SELECT id, username, is_active
        from users
        WHERE id = ?
        LIMIT 1` ,
        [userID]
    );

    return rows[0] ?? null ;
}

//phan quyen

export async function findRolesByUserID(userID) {
    const [rows] = await db.execute(
        `SELECT r.code
        FROM user_roles AS ur
        JOIN roles AS r ON r.id =ur.role_id
        WHERE ur.user_id = ?`,
        [userID] 
    )
//map di qua tung object trong rows, lay code va tao mang moi. Neu khong co role, row la [] thi kq  = []
    return rows.map((row) => row.code)
}