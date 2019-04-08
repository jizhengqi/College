package com.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.ReplyDao;
import com.entity.Reply;

@Service
@Transactional
public class ReplyService {
	
	@Resource
	ReplyDao rd;
	
	// 添加回帖
	public Integer add(Reply r){
		return rd.add(r);
	}
	
	// 删除回帖
	public Integer del(Integer r_id){
		return rd.del(r_id);
	}
	
	// 修改回帖
	// 没有写mapper
	public Integer upd(Reply r){
		return rd.upd(r);
	}
	
	// 查询某个课程下的回帖信息
	public List<Map<String,Object>> queryByReply(Integer s_id){
		return rd.queryByReply(s_id);
	}
	
	// 分页查询某个课程下的回帖信息
	public List<Map<String,Object>> queryByPage(Integer s_id,Integer page,Integer limit){
		return rd.queryByPage(s_id, page, limit);
	}
	
}
