package com.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Reply;
import com.service.ReplyService;

@Controller
@RequestMapping("reply")
public class ReplyController {

	@Resource
	ReplyService rs;
	
	// 添加回帖信息
	@RequestMapping("add")
	@ResponseBody
	public Integer add(Reply r){
		return rs.add(r);
	}
	
	// 删除回帖信息
	@RequestMapping("del")
	@ResponseBody
	public Integer del(Integer r_id){
		return rs.del(r_id);
	}
	
	// 修改回帖信息
	@RequestMapping("upd")
	@ResponseBody
	public Integer upd(Reply r){
		return rs.upd(r);
	}
	
	// 查询某个技术问答的回帖信息
	@RequestMapping("queryByReply")
	@ResponseBody
	public List<Map<String,Object>> queryByReply(Integer s_id){
		return rs.queryByReply(s_id);
	}
	
	// 分页查询某个问答的回帖信息
	@RequestMapping("queryByPage")
	@ResponseBody
	public List<Map<String,Object>> queryByPage(Integer s_id,Integer page,Integer limit){
		return rs.queryByPage(s_id, page, limit);
	}
}
