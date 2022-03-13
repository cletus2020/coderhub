const fs = require('fs')

const service = require('../service/user.service')
const fileService = require('../service/file.service')
const {AVATAR_PATH} = require('../constants/file-path')

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body

    // 查询数据
    const result = await service.create(user)

    // 返回数据
    ctx.body = result
  }
  async avatarInfo(ctx, next) {
    const {userId} = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)

    // 提供图像信息
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()