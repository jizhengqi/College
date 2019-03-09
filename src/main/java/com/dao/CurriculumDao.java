package com.dao;

import java.util.List;

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

	/**
	 * 查询自己录制的课程
	 * 
	 * @param u_id
	 * @return
	 */
	public List<Curriculum> queryCurriculum(String u_id);
}
