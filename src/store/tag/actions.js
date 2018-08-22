import TagService from "../../services/TagService";

export const GET_TAGS_DATA   = 'GET_TAGS_DATA';

export const tagDataSuccess = (data) => {
    return {
        type: GET_TAGS_DATA,
        data
    };
}

export const getTagsData = () => {
    return dispatch => TagService.getTagsData().then(data => {
        dispatch(tagDataSuccess(data.tags));
    });
};