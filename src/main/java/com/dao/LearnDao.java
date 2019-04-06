package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Learn;

@Mapper
public interface LearnDao {
	
	// 查询所有浏览的课程
	public List<Learn> queryAll(String u_id);
	
	// 添加浏览课程信息
	public void add(Learn l);
	
	// 根据信息查询是否存在
	public List<Learn> queryByAll(Learn l);
}
