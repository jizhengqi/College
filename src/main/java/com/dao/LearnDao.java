package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Curriculum;
import com.entity.Learn;

@Mapper
public interface LearnDao {

	// 查询所有浏览的课程
	public List<Learn> queryAll(String u_id);

	// 添加浏览课程信息
	public void add(Learn l);

	// 根据信息查询是否存在
	public List<Learn> queryByAll(Learn l);

	/**
	 * 根据用户ID和课程ID查询正在学习的课程
	 * 
	 * @param u_id
	 * @param c_id
	 * @return
	 */
	public Learn getLearnByU_idAndC_id(String u_id, Integer c_id);

	/**
	 * 修改学习情况
	 * 
	 * @param
	 * @return
	 */
	public Integer update(Learn l);
	
	// 查询某个用户下的所有课程
	public List<Curriculum> queryByU_id(String u_id);
	
}
