package com.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.Skill_AskDao;
import com.entity.Skill_Ask;

@Service
@Transactional
public class Skill_AskService {
	
	@Resource
	Skill_AskDao sad;
	
	// 添加技术问答
	public void add(Skill_Ask s){
		sad.add(s);
	}
	
	// 修改技术问答
	public void upd(Skill_Ask s){
		sad.upd(s);
	}
	
	// 删除技术问答
	public void del(Integer s_id){
		sad.del(s_id);
	}
	
	// 查询某个技术问答
	public List<Skill_Ask> queryById(Integer s_id){
		return sad.queryById(s_id);
	}
	
	// 查询所有技术问答
	public List<Skill_Ask> queryAll(){
		return sad.queryAll();
	}
	
	// 分页查询
	public List<Skill_Ask> queryByPage(Integer page,Integer limit){
		return sad.queryByPage(page, limit);
	}
	
	// 查询所有技术问答页面
	public List<Map<String,Object>> querySkill_ask(Integer page,Integer limit){
		return sad.querySkill_ask(page, limit);
	}
	
	// 根据编号查询当前技术问答信息
	public List<Map<String,Object>> querySkill_askByid(Integer s_id){
		return sad.querySkill_askByid(s_id);
	}
}
