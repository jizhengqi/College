package com.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Skill_Ask;

@Mapper
public interface Skill_AskDao {
	
	// 添加技术问答
	public void add(Skill_Ask s);
	
	// 删除技术问答
	public void del(Integer s_id);
	
	// 修改技术问答
	public void upd(Skill_Ask s);
	
	// 查询所有技术问答
	public List<Skill_Ask> queryAll();
	
	// 分页查询技术问答
	public List<Skill_Ask> queryByPage(Integer page,Integer limit);
	
	// 根据编号查询技术问答
	public List<Skill_Ask> queryById(Integer s_id);
	
	// 查询所有的技术问答信息
	public List<Map<String,Object>> querySkill_ask(Integer page,Integer limit);
	
}
