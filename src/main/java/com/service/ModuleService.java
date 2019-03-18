package com.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.ModuleDao;
import com.entity.Curriculum;
import com.entity.Module;

@Service
@Transactional
public class ModuleService {
	
	@Resource
	ModuleDao md;
	
	// 查询所有语言和所有语言板块
	public List<Map<String,Object>> queryAll(){
		return md.queryAll();
	}
	
	// 添加语言模块
	public void add(Module m){
		md.add(m);
	}
	
	// 修改语言模块
	public void upd(Module m){
		md.upd(m);
	}
	
	// 删除语言模块
	public void del(Integer m_id){
		md.del(m_id);
	}
	
	// 根据语言模块查询课程
	public List<Curriculum> queryByModule(String m_name){
		return md.queryByModule(m_name);
	}
}
