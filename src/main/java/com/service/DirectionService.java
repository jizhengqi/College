package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.DirectionDao;
import com.entity.Curriculum;
import com.entity.Direction;

@Service
@Transactional
public class DirectionService {
	
	@Resource
	DirectionDao dd;
	
	public List<Direction> queryAll(){
		return dd.queryAll();
	}
	
	public void add(Direction d){
		dd.add(d);
	}
	
	public void upd(Direction d){
		dd.upd(d);
	}
	
	public void del(Integer d_id){
		dd.del(d_id);
	}
	
	public List<Curriculum> queryByDirection(String d_name){
		return dd.queryByDirection(d_name);
	}
	
	// 分页查询所有技术方向
	public List<Direction> queryDirection(Integer page,Integer limit){
		return dd.queryDirection(page, limit);
	}
	
}
