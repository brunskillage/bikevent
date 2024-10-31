import { PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../lib/common";

export const usePageMode = (pageMode) => {

    const isViewingMode = () => {
        return pageMode === PAGE_MODE_VIEW
    }

    const isEditMode = () => {
        return pageMode === PAGE_MODE_EDIT
    }

    const isAddMode = () => {
        return pageMode === PAGE_MODE_ADD
    }

    return [isViewingMode, isEditMode, isAddMode]
}