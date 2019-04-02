package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.CollectDao;
import com.entity.Collect;

@Service
@Transactional
public class CollectService {

	@Resource
	CollectDao cd;

	// 根据信息查询是否关注当前视频
	public List<Collect> queryByCollect(String u_id, Integer c_id, Integer v_id) {
		System.out.println(u_id);
		System.out.println(c_id);
		System.out.println(v_id);
		System.out.println(cd.queryByCollect(u_id, c_id, v_id));
		return cd.queryByCollect(u_id, c_id, v_id);
	}

	// 添加数据
	public void add(String u_id, Integer c_id, Integer v_id) {
		cd.add(u_id, c_id, v_id);
	}

	// 删除数据
	public void del(String u_id, Integer c_id, Integer v_id) {
		cd.del(u_id, c_id, v_id);
	}

	// 查询某个用户所有收藏的课程
	public List<Collect> queryById(String u_id) {
		return cd.queryById(u_id);
	}
}
