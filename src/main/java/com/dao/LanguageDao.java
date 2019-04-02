package com.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Curriculum;
import com.entity.Language;

@Mapper
public interface LanguageDao {
	
	// 查询所有语言分类
	public List<Language> queryAll();
	
	// 修改语言分类
	public void upd(Language l);
	
	// 删除语言分类
	public void del(Integer l_id);
	
	// 添加语言分类
	public void add(Language l);
	
	// 根据语言查询所有课程
	public List<Curriculum> queryByLanguage(String l_name);
	
	// 分页查询所有语言信息
	public List<Language> queryLanguage(Integer page,Integer limit);
	
	// 查询某个技术方向的所有语言分类
	public List<Language> queryByD_id(Integer d_id);
	
	// 查询
	public List<Map<String,Object>> SelectByD_id(Integer page,Integer limit);
}
