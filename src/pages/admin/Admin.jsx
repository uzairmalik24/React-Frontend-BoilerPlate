import { useEffect, useState } from "react";
import AdminBreadcrumb from "../../components/ui/BreadCrumb";
import { useApi } from "../../hooks/useApi";
import DataTable from "../../components/ui/DataTable";
import { FiDelete, FiEdit } from "react-icons/fi";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { Modal } from "../../components/ui/Dialog";
import { TextInput } from "../../components/ui/FormInputs";

const Admin = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const { get } = useApi();

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                setLoading(true);

                setAdmins(staticData.admins);
                setTotal(staticData.pagination.totalItems);
                setLoading(false);

                // const response = await get("/admin/get-by-filter", {
                //     params: {
                //         page,
                //         limit: size,
                //     },
                // });

                // // Check if response is successful
                // if (response.data?.isSuccess) {
                //     const data = response.data?.filteredData;

                //     if (data) {
                //         setAdmins(data.admins || []);
                //         setTotal(data.pagination?.totalItems || 0);
                //     }
                // } else {
                //     console.error("API returned unsuccessful response");
                //     setAdmins([]);
                //     setTotal(0);
                // }
            } catch (err) {
                console.error("Failed to load admins:", err);

                // Static fallback data on error

                setAdmins(staticData.admins);
                setTotal(staticData.pagination.totalItems);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, [page, size]);

    const handleEditClick = (admin) => {
        setSelectedAdmin(admin);
        setFormData({
            name: admin.name || "",
            email: admin.email || "",
        });
        setFormErrors({});
        setFormDialogOpen(true);
    };

    const handleDeleteClick = (admin) => {
        setSelectedAdmin(admin);
        setShowConfirmationModal(true);
    };

    const handleFormSubmit = () => {
        // Validate form
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // TODO: API call to update admin
        console.log("Update admin:", selectedAdmin?._id, formData);

        // Close modal and reset
        setFormDialogOpen(false);
        setSelectedAdmin(null);
        setFormData({ name: "", email: "" });
        setFormErrors({});
    };

    const handleDeleteConfirm = () => {
        // TODO: API call to delete admin
        console.log("Delete admin:", selectedAdmin?._id);

        setShowConfirmationModal(false);
        setSelectedAdmin(null);
    };

    const tableRows = admins.map((admin) => [
        // Name with Avatar
        <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
                {admin.profileImage ? (
                    <img
                        src={admin.profileImage}
                        alt={admin.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-border"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary uppercase">
                            {admin.name?.charAt(0) || "?"}
                        </span>
                    </div>
                )}
            </div>
            {/* Name */}
            <span className="font-medium text-foreground">{admin.name || "—"}</span>
        </div>,

        // Email
        admin.email || "—",

        // Role Badge
        admin.isSuperAdmin ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20">
                Super Admin
            </span>
        ) : (
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border">
                Admin
            </span>
        ),

        // Actions
        <div className="flex items-center gap-3">
            <button
                onClick={() => handleEditClick(admin)}
                className="p-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg transition-all duration-200"
                title="Edit Admin"
            >
                <FiEdit size={16} />
            </button>
            <button
                onClick={() => handleDeleteClick(admin)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all duration-200"
                title="Delete Admin"
            >
                <FiDelete size={16} />
            </button>
        </div>,
    ]);

    return (
        <>
            {/* Breadcrumb */}
            <AdminBreadcrumb
                title="Admin Management"
                items={[{ label: "Dashboard", href: "/dashboard" }]}
                currentPage="Admin Management"
                showBack={true}
            />

            {/* Main content */}
            <div className="p-6 mt-5">
                <DataTable
                    headers={["Name", "Email", "Role", "Actions"]}
                    rows={tableRows}
                    currentPage={page}
                    pageSize={size}
                    totalItems={total}
                    onPageChange={setPage}
                    onSizeChange={setSize}
                    loading={loading}
                    emptyMessage="No administrators found"
                />
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => {
                    setShowConfirmationModal(false);
                    setSelectedAdmin(null);
                }}
                title="Delete Admin"
                message={`Are you sure you want to delete ${selectedAdmin?.name}? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                type="danger"
                confirmButtonVariant="danger"
                confirmText="Delete"
            />

            {/* Form Dialog */}
            <Modal
                isOpen={formDialogOpen}
                onClose={() => {
                    setFormDialogOpen(false);
                    setSelectedAdmin(null);
                    setFormData({ name: "", email: "" });
                    setFormErrors({});
                }}
                onSubmit={handleFormSubmit}
                title="Edit Admin"
                submitText="Update"
                size="md"
            >
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <TextInput
                        label="Name"
                        type="text"
                        placeholder="Enter admin name"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (formErrors.name) {
                                setFormErrors({ ...formErrors, name: "" });
                            }
                        }}
                        error={formErrors.name}
                        required
                    />

                    <TextInput
                        label="Email"
                        type="email"
                        placeholder="Enter admin email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) {
                                setFormErrors({ ...formErrors, email: "" });
                            }
                        }}
                        error={formErrors.email}
                        required
                    />
                </form>
            </Modal>
        </>
    );
};

export default Admin;









const staticData = {
    admins: [
        {
            _id: "692557cd13ebcecfb050aa84",
            name: "Super Admin",
            email: "superadmin@growth.com",
            isSuperAdmin: true,
            accessTabs: [],
            is2FAEnabled: false,
            createdAt: "2025-11-25T07:16:29.590Z",
            updatedAt: "2025-11-25T07:16:29.590Z",
        }
    ],
    pagination: {
        page: 1,
        size: 10,
        totalItems: 1,
        totalPages: 1,
    }
};
