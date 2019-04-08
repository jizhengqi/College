package com.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.CurriculumDao;
import com.entity.Curriculum;

@Service
@Transactional
public class CurriculumService {
	
	@Resource
	CurriculumDao cd;
	
	// 添加课程详细信息
	public void add(Curriculum c){
		cd.add(c);
	}
	
	// 修改课程信息
	public void upd(Curriculum c){
		cd.upd(c);
	}
	
	// 删除课程信息
	public void del(Integer c_id){
		cd.del(c_id);
	}
	
	// 查询某个课程信息
	public List<Curriculum> queryById(Integer c_id){
		return cd.queryById(c_id);
	}
	
	// 查询所有课程信息
	public List<Curriculum> queryAll(){
		return cd.queryAll();
	}
	
	// 分页查询课程信息
	public List<Curriculum> queryByPage(Integer page,Integer limit){
		return cd.queryByPage(page, limit);
	}
	
	/**
	 * 添加课程
	 * 
	 * @param curriculum
	 * @return
	 */
	public Integer addCurriculum(Curriculum curriculum) {
		return cd.addCurriculum(curriculum);
	}

	/**
	 * 查询自己录制的课程
	 * 
	 * @param u_id
	 * @return
	 */
	public List<Curriculum> queryCurriculum(String u_id) {
		return cd.queryCurriculum(u_id);
	}
	
	// 查询前台推荐课程
	public List<Map<String,Object>> selectAll(){
		return cd.selectAll();
	}
}
