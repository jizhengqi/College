package com.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Curriculum;

@Mapper
public interface CurriculumDao {
	/**
	 * 添加课程
	 * 
	 * @param curriculum
	 * @return
	 */
	public Integer addCurriculum(Curriculum curriculum);
	
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
	
	/**
	 * 查询自己录制的课程
	 * 
	 * @param u_id
	 * @return
	 */
	public List<Curriculum> queryCurriculum(String u_id);
	
	// 查询课程信息
	public List<Map<String,Object>> selectAll();
	
	// 根据技术方向查询所有的评论信息
	public List<Map<String,Object>> queryByDirection(String d_name);
	
	// 根据语言分类查询所有的评论信息
	public List<Map<String,Object>> queryByLanguage(String l_name);
	
	// 根据语言模块查询所有的评论信息
	public List<Map<String,Object>> queryByModule(String m_name);
}
