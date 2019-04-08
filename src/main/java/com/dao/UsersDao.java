package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Users;

@Mapper
public interface UsersDao {

	// 添加用户
	public void add(Users s);

	// 用户登陆
	public List<Users> queryByName(String uname, String pwd);

	// 根据账号查询信息
	public Users queryLog(String uname);

	// 修改用户
	public void upd(Users s);

	// 删除用户
	public void del(Integer u_id);

	// 查询所有用户
	public List<Users> queryAll();

	// 分页查询
	public List<Users> queryPage(Integer page, Integer limit);

	// 查询所有认证导师的用户
	public List<Users> queryByTeacher(Integer page, Integer limit);

	// 查询所有认证导师
	public List<Users> queryByTeachers();

	// 查询所有VIP用户
	public List<Users> queryByVIP(Integer page, Integer limit);

	// 分页查询VIP
	public List<Users> queryByVIPs();

	// 根据编号判断用户是否是VIP
	public List<Users> queryVipById(String u_id);

	public Integer addBuDaoShi(Users user);

	// 后台教师登陆查询并发布课程
	public List<Users> query_HT_teacher(String uname, String pwd);
}
