package com.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Reply;

@Mapper
public interface ReplyDao {
	
	// 添加回帖表
	public Integer add(Reply r);
	
	// 删除回帖信息
	public Integer del(Integer r_id);
	
	// 修改回帖信息
	public Integer upd(Reply r);
	
	// 查询所有回帖信息
	public List<Map<String,Object>> queryByReply(Integer s_id);
	
	// 分页查询回帖信息
	public List<Map<String,Object>> queryByPage(Integer s_id,Integer page,Integer limit);
	
}
