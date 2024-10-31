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
        // availability: subRoute(ROOT, "rider/shift-availability"),
        dashboard: subRoute(ROOT, "rider/dashboard"),
        selectLocations: subRoute(ROOT, "rider/select-locations"),
        completeProfile: subRoute(ROOT, "rider/complete-profile"),
        faq: subRoute(ROOT, "rider/faq"),
        help: subRoute(ROOT, "rider/help"),
        editProfile: subRoute(ROOT, "rider/edit-profile"),
        profile: subRoute(ROOT, "rider/profile"),
        errors: subRoute(ROOT, "rider/errors"),
        plannedShifts: subRoute(ROOT, "rider/planned-shifts"),

        // preShifts: subRoute(ROOT, "rider/pre-shift"),
        // preShiftsIdle: subRoute(ROOT, "rider/to-do"),
        // scanBag: subRoute(ROOT, "rider/scan-bag"),
        // shiftCommissioning: subRoute(ROOT, "rider/shift-commissioning"),
        // shiftCommissioningProblem: subRoute(
        //     ROOT,
        //     "rider/shift-commissioning-problem",
        // ),
        // delivery: subRoute(ROOT, "rider/delivery"),
    },
};

export const RIDER = {
    CALENDER: "calender",
    PRE_SHIFT: "pre-shift",
    TO_DO: "to-do",
    SHIFT_COMMISSIONING: "shift-commissioning",
    DELIVERY: "delivery",
};

export const RIDER_AFTER_LOGIN = PATH_DASHBOARD.rider.dashboard;

export const DISABLE_COMMON_HEADER = {
    [PATH_DASHBOARD.hubManager.editProfile]: true,
    [PATH_DASHBOARD.hubManager.shifts]: true,
    [PATH_DASHBOARD.hubManager.addShift]: true,
    "/hubmanager/shifts/[shift_id]": true,
};
