package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

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
}
