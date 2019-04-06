package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.LearnDao;
import com.entity.Learn;

@Service
@Transactional
public class LearnService {
	
	@Resource
	LearnDao ld;
	
	// 查询所有浏览的课程
	public List<Learn> queryAll(String u_id){
		return ld.queryAll(u_id);
	}
	
	// 添加课程
	public void add(Learn l){
		ld.add(l);
	}
	
	// 根据信息查询是否存在
	public List<Learn> queryByAll(Learn l){
		return ld.queryByAll(l);
	}
	
}
