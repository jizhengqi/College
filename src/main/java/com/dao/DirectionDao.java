package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Curriculum;
import com.entity.Direction;

@Mapper
public interface DirectionDao {
	
	// 查询所有技术方向
	public List<Direction> queryAll();
	
	// 添加技术方向
	public void add(Direction d);
	
	// 修改技术方向
	public void upd(Direction d);
	
	// 删除技术方向
	public void del(Integer d_id);
	
	// 根据技术方向查询所有课程信息
	public List<Curriculum> queryByDirection(String d_name);
	
	// 分页插叙所有课程信息
	public List<Direction> queryDirection(Integer page,Integer limit);

}
