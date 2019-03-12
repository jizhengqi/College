package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

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
}
