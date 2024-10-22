function subRoute(root, subRoute) {
    return `${root}${subRoute}`;
}
const ROOT = "/";

export const PATH_DASHBOARD = {
    root: ROOT,
    supplier: {
        dashboard: subRoute(ROOT, "supplier/dashboard"),
        products: {
            root: subRoute(ROOT, "supplier/products"),
            add: subRoute(ROOT, "supplier/product/add"),
            edit: (id) => subRoute(ROOT, `supplier/product/${id}`),
        },
    },
    hubManager: {
        dashboard: subRoute(ROOT, "hubmanager/dashboard"),
        editProfile: subRoute(ROOT, "hubmanager/editprofile"),
        schedule: subRoute(ROOT, "hubmanager/schedule"),
        shifts: subRoute(ROOT, "hubmanager/shifts"),
        addShift: subRoute(ROOT, "hubmanager/shifts/add"),
        update: (shift_id) => subRoute(ROOT, `hubmanager/shifts/${shift_id}`),
    },
    rider: {
        availability: subRoute(ROOT, "rider/shift-availability"),
        selectLocations: subRoute(ROOT, "rider/select-locations"),
        completeProfile: subRoute(ROOT, "rider/complete-profile"),
        faq: subRoute(ROOT, "rider/faq"),
        help: subRoute(ROOT, "rider/help"),
        editProfile: subRoute(ROOT, "rider/edit-profile"),
        profile: subRoute(ROOT, "rider/profile"),
        dashboard: subRoute(ROOT, "rider/dashboard"),
        errors: subRoute(ROOT, "rider/errors"),
        plannedShifts: subRoute(ROOT, "rider/planned-shifts"),
    },
};

export const RIDER_AFTER_LOGIN = PATH_DASHBOARD.rider.dashboard;
