
import axiosRequest from '@src/network/axiosRequest';
import { ICourse } from '@src/types/course.types';
import { IPagination } from '@src/types/pagination.types';
import { IBaseResponse } from '@src/types/response.types';
import onRemoveParams from '@utils/functions/on-remove-params';

class CourseService {
  private _prefixURL = '/v1/courses';

  public async getAllCourse(parameters: Record<string, any>): Promise<IBaseResponse<IPagination<ICourse>>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(parameters)
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getCourseDetail(courseId: string): Promise<IBaseResponse<ICourse>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${courseId}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CourseService;
