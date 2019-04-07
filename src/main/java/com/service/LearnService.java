package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.LearnDao;
import com.entity.Curriculum;
import com.entity.Learn;

@Service
@Transactional
public class LearnService {

	@Resource
	LearnDao ld;

	// 查询所有浏览的课程
	public List<Learn> queryAll(String u_id) {
		return ld.queryAll(u_id);
	}

	// 添加课程
	public void add(Learn l) {
		ld.add(l);
	}

	// 根据信息查询是否存在
	public List<Learn> queryByAll(Learn l) {
		return ld.queryByAll(l);
	}

	/**
	 * 查询学习的课程根据用户ID和课程ID
	 * 
	 * @param u_id
	 * @param c_id
	 * @return
	 */
	public Learn getLearnByU_idAndC_id(String u_id, Integer c_id) {
		return ld.getLearnByU_idAndC_id(u_id, c_id);
	}
	
	// 根据用户ID获取观看的所有课程
	public List<Curriculum> queryByU_id(String u_id){
		return ld.queryByU_id(u_id);
	}

	/**
	 * 修改学习情况
	 * 
	 * @param l
	 * @return
	 */
	public Integer update(Learn l) {
		return ld.update(l);
	}

}
