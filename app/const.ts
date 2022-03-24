export const commonColumn = [
  'b.userId',
  'b.title',
  'b.description',
  'b.imageName',
  'b.image',
  'b.classifyId',
  'b.label',
  'b.hit',
  'b.comment',
  'b.createTime',
  'b.updateTime',
  'b.status',
  'b.isDelete',
  'b.isTop',
  'b.isLove'
]
export const publishedCondition = 'b.status = 1 and b.isDelete = 0'
