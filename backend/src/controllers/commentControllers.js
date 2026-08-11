import pool from "../config/database.js";
const newComment=async(req, res)=>{
    try {
        const {comment} = req.body;
        const sender = req.user;
        const project_id = req.params.project_id;
        // validate if this project is available
        const foundProject = await pool.query(`
            SELECT EXISTS(
                SELECT 1
                FROM projects
                WHERE project_id = $1              
            )  
        `,[project_id]);     

        if(!foundProject.rows.exists) return(res.status(404).json({message:"Can't find this project, enter valid project id."})); 
        // result
        const result = await pool.query(`
           INSERT INTO comments(comment, sender, project_parent)
           VALUES ($1, $2, $3)
           RETURNING *
        `,[comment, sender, project_id]);

        res.status(200).json({message:"Comment added successfully.", result: result.rows[1]});
        // broadcast the message
        req.io.to(`roomId:${project_id}`).emit("commented",{
            comment,
            sender
        })

    } catch (error) {
        res.status(500).json({message:"Internal server error, error in creating comment.", error:error.message});                       
    }
}

const getComments=async(req, res)=>{
    try {
        const project_id = req.params.project_id;
        const result = await pool.query(`
            SELECT * 
            FROM comments
            WHERE project_parent = $1
            `, [project_id]
        );
        if (result.rows.length == 0) return res.status(404).json({message:"Couldn't find comments."});
        const data = result.rows[0];
        res.status(200).json({message:"Comments gotten.", data});
    } catch (error) {
        res.status(500).json({message:"Internal server error, error in getting comments.", error:error.message});                       
    }
}

export {newComment, getComments};