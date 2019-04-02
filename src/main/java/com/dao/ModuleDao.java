package com.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Curriculum;
import com.entity.Module;

@Mapper
public interface ModuleDao {
	
	// 查询所有语言和所有语言板块
	public List<Map<String,Object>> queryAll();
	
	// 添加语言模块
	public void add(Module m);
	
	// 修改语言模块
	public void upd(Module m);
	
	// 删除语言模块
	public void del(Integer m_id);
	
	// 根据语言模块查询视频
	public List<Curriculum> queryByModule(String m_name);
	
	// 查询所有语言模块
	public List<Module> SelectAll();
	
	// 分页查询所有语言模块
	public List<Module> queryModule(Integer page,Integer limit);
	
	// 查询某个语言的所有语言模块
	public List<Module> queryByL_id(Integer l_id);
	
	// 查询
	public List<Map<String,Object>> SelectByL_id();
}
