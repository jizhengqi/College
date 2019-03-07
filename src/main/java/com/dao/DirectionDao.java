package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Direction;

@Mapper
public interface DirectionDao {
	
	// 查询所有技术方向
	public List<Direction> queryAll();
}
