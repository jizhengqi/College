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
	public List<Map<String, Object>> queryAll() {
		return md.queryAll();
	}

	// 添加语言模块
	public void add(Module m) {
		md.add(m);
	}

	// 修改语言模块
	public void upd(Module m) {
		md.upd(m);
	}

	// 删除语言模块
	public void del(Integer m_id) {
		md.del(m_id);
	}

	// 根据语言模块查询课程
	public List<Curriculum> queryByModule(String m_name, Integer c_vip,
			Integer c_level) {
		return md.queryByModule(m_name, c_vip, c_level);
	}

	// 查询所有语言模块
	public List<Module> SelectAll() {
		return md.SelectAll();
	}

	// 分页查询所有技术方向
	public List<Module> queryModule(Integer page, Integer limit) {
		return md.queryModule(page, limit);
	}

	public List<Module> queryByl_id(Integer l_id) {
		return md.queryByL_id(l_id);
	}

	public List<Map<String, Object>> SelectByL_id(Integer page, Integer limit) {
		return md.SelectByL_id(page, limit);
	}

}
