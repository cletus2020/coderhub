const connection = require('../app/database')

class CommentService {
  async create(momentId, content, userId) {
    try {
      const statement = `
        INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);
      `
      const [result] = await connection.execute(statement, [content, momentId, userId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async reply(momentId, content, userId, commentId) {
    try {
      const statement = `
        INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);
      `
      const [result] = await connection.execute(statement, [content, momentId, userId, commentId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async update(commentId, content) {
    try {
      const statement = `
        UPDATE comment SET content = ? WHERE id = ?;
      `
      const [result] = await connection.execute(statement, [content,commentId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async remove(commentId) {
    try {
      const statement = `
        DELETE FROM comment WHERE id = ?; 
      `
      const [result] = await connection.execute(statement, [commentId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getCommentByMomentId(momentId) {
    try{
      const statement = `
      SELECT
        m.id, m.content, m.comment_id commentId, m.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name)
      FROM comment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE moment_id = ?;
      `
      const [result] = await connection.execute(statement, [momentId])
      return result
    } catch(error) {
      console.log(error)
    }
  }
}

module.exports = new CommentService()
