const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String , required: true},
  nickname: {type: String , required: true},
  password: {type: String , required: true},
  // 注意：Date.now不要写括号
  // 这里直接给了一个方法
  // 当去new Model的时候，没有传递时就会自动调用Date.now的方法
  // 
  created_time: {type: Date , default: Date.now},
  last_modified_time: {type: Date , default: Date.now},
  avatar: {type: String , default: '/public/img/avatar-default.png'},
  bio: {type: String , default: ''},
  gender: {type: Number , enum: [-1,0,1] , default: -1},
  birthday: {type: Date , default: ''},
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录使用
    enum: [0, 1, 2],
    default: 0
  }
});

module.exports = mongoose.model('User' , userSchema);