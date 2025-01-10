import {
    getTagList
} from '@/app/actions';

import {
    TagViewsChartConfig
} from '@/admin/statistics/_types';

export const getTagViewsDataSet = async () => {
    const tagList = await getTagList();

    const tagViewDataSet: TagViewsChartConfig[] = tagList.map(tag => {
        return {
            tag: tag.label,
            views: tag.views ?? 0,
        }
    });

    return tagViewDataSet;
}