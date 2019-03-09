package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.CurriculumDao;
import com.entity.Curriculum;

@Service
@Transactional
public class CurriculumService {

	@Resource
	CurriculumDao curriculumDao;

	/**
	 * 添加课程
	 * 
	 * @param curriculum
	 * @return
	 */
	public Integer addCurriculum(Curriculum curriculum) {
		return curriculumDao.addCurriculum(curriculum);
	}

	/**
	 * 查询自己录制的课程
	 * 
	 * @param u_id
	 * @return
	 */
	public List<Curriculum> queryCurriculum(String u_id) {
		return curriculumDao.queryCurriculum(u_id);
	}
}
