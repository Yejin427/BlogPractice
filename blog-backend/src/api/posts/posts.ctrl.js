const Post = require('../../models/post');
const Joi = require('joi');
const {ObjectId} = require('mongoose').Types;

exports.checkObjectId = (ctx, next) =>{
  const {id} = ctx.params;

  if(!ObjectId.isValid(id)){
    ctx.status = 400;
    return null;
  }
  return next();
};

exports.write = async (ctx) =>{
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  });

  const result = schema.validate(ctx.request.body);
  if(result.error){
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title, body, tags
  });
  try{
    await post.save();  //database 등록
    ctx.body = post;  //결과 반환
  } catch(e) {
    //database error
    ctx.throw(e, 500);
  }
};

exports.list = async (ctx) =>{
  const page = parseInt(ctx.query.page || 1, 10);
  if(page < 1){
    ctx.status = 400;
    return;
  }

  try{
    const posts = await Post.find()
    .sort({_id: -1})//역순 정렬
    .limit(10)
    .skip((page - 1) * 10)
    .lean()
    .exec(); 
    const postCount = await Post.count().exec();  //마지막 페이지 알려주기

    const limitBodyLength = post =>({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
    });
    ctx.body = posts.map(limitBodyLength);

    ctx.set('Last-Page', Math.ceil(postCount/10));
  } catch(e){
    ctx.throw(e, 500);
  }
};

exports.read = async (ctx) =>{
  const {id} = ctx.params;
  try{
    const post = await Post.findById(id).exec();
    if(!post){
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch(e){
    ctx.throw(e, 500);
  }
};

exports.remove = async (ctx) =>{
  const {id} = ctx.params;
  try{
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 404;
  } catch(e){
    ctx.throw(e, 500);
  }
};

exports.update = async (ctx) =>{
  const {id} = ctx.params;
  try{
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
      //update된 객체 반환
    }).exec();

    if(!post){
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch(e){
    ctx.throw(e, 500);
  }
};