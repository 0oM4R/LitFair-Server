const { job, application } = require('./index');
require('dotenv').config();

const sampleData = {
  title: 'new title',
  owner_id: 136,
  date_posted: '2020-12-16',
  job_type: 'full-time',
  location: 'egypt',
  categories: ['arr1', 'arr2', 'arr3'],
  description: 'this is th desc',
  requirements: ['req1', 'req2'],
  skills_tools: ['skils1', 'ssk2'],
  applications: [],
};
describe('B suite', () => {
  it('contains spec with an expectation', () => {
    expect(true).toBe(true);
  });
});

describe('Sample data suite', () => {
  it('Add new job ', async () => {
    const jobA = new job(process.env.MONGODB_URI);

    const {
      title,
      owner_id,
      job_type,
      location,
      categories,
      description,
      requirements,
      skills_tools,
    } = await jobA.addJob(sampleData);

    expect(
      title,
      owner_id,
      job_type,
      location,
      categories,
      description,
      requirements,
      skills_tools
    ).toBe(
      sampleData.title,
      sampleData.owner_id,
      sampleData.job_type,
      sampleData.location,
      sampleData.categories,
      sampleData.description,
      sampleData.requirements,
      sampleData.skills_tools
    );
  });
});
