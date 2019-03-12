package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Curriculum;

@Mapper
public interface CurriculumDao {
	
	// 添加课程详细信息
	public void add(Curriculum c);
	
	// 修改课程详细信息
	public void upd(Curriculum c);
	
	// 删除课程详细信息
	public void del(Integer c_id);
	
	// 查询课程详细信息
	public List<Curriculum> queryById(Integer c_id);
	
	// 查询所有课程信息
	public List<Curriculum> queryAll();
	
	// 分页查询
	public List<Curriculum> queryByPage(Integer page,Integer limit);
	
}
