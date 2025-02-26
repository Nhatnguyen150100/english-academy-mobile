import axiosRequest from "@src/network/axiosRequest";
import { IPagination } from "@src/types/pagination.types";
import { IBaseResponse } from "@src/types/response.types";
import { IBlogDetail, IBlogInfo, TStatusBlog } from "@styles/blogs";
import onRemoveParams from "@utils/functions/on-remove-params";

class BlogService {
  private _prefixURL = "/v1/blogs";

  public async getAllBlogsApproved(
    parameters: Record<string, any>
  ): Promise<IBaseResponse<IPagination<IBlogInfo>>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(parameters),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getAllBlogByUser(
    parameters: Record<string, any>
  ): Promise<IBaseResponse<IPagination<IBlogInfo>>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/by-user`, {
        params: onRemoveParams(parameters),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getBlogDetail(
    blogId: string
  ): Promise<IBaseResponse<IBlogDetail>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${blogId}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async createBlog(
    data: Record<string, any>
  ): Promise<IBaseResponse<IBlogDetail>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateStatusBlog(
    blogId: string,
    status: TStatusBlog
  ): Promise<IBaseResponse<IBlogDetail>> {
    try {
      const rs = await axiosRequest.put(
        `${this._prefixURL}/status-blog/${blogId}`,
        { status }
      );
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateBlogContent(
    blogId: string,
    data: Record<string, any>
  ): Promise<IBaseResponse<IBlogDetail>> {
    try {
      const rs = await axiosRequest.put(`${this._prefixURL}/${blogId}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async deleteBlog(blogId: string): Promise<IBaseResponse<IBlogDetail>> {
    try {
      const rs = await axiosRequest.delete(`${this._prefixURL}/${blogId}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default BlogService;
