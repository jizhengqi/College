package com.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ModuleDao {
	
	// 查询所有语言和所有语言板块
	public List<Map<String,Object>> queryAll();
}
