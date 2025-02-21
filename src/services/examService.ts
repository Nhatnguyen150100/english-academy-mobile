
import axiosRequest from '@src/network/axiosRequest';
import { IExamDetail } from '@src/types/exam.types';
import { IBaseResponse } from '@src/types/response.types';

class ExamService {
  private _prefixURL = '/v1/exams';

  public async getExamDetail(examId: string): Promise<IBaseResponse<IExamDetail>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${examId}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ExamService;
