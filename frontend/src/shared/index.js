export { default as AuthLayout } from "./layouts/AuthLayout";
export { default as DashboardLayout } from "./layouts/DashboardLayout";

// Componenetes
export {default as Input} from "./components/Input";
export {default as Button} from "./components/Button";
// export {default as DeteleCounter} from "./components/DeleteCounter";
// export {default as DeteleCounter2} from "./components/DeleteCounter2";
export {default as SelectInventory} from "./components/SelectInventory"
export {default as EffectDemo} from "./components/EffectDemo";
export {default as CounterEffect} from "./components/CounterEffect";
export {default as Select } from "./components/Select";
export {default as Checkbox } from "./components/Checkbox";
export { IconButton } from "./components/IconButton";
export { default as SearchField } from "./components/SearchField";
export { default as StatusSwitch } from "./components/StatusSwitch";
export { default as DataTable } from "./components/DataTable";
export { default as FileInput } from "./components/Filelnput";
export { default as Card } from "./components/Card";
export { default as ListReportModal } from "./components/ListReportModal";
export { default as DetailItem } from "./components/DetailItem";
export { default as CheckboxGroup } from "./components/CheckboxGroup";
export { default as ProtectedRoute } from "./components/auth/ProtectedRoute";
export { default as AccessSidebar } from "./components/AccessSidebar";

// Layout components
export {default as Navbar } from "./layouts/Navbar";
export {
    Dropdown,
    DropdownTrigger,
    DropdownItem,
    DropdownContent, 
} from "./components/Dropdown";

export {
  showSuccessAlert,
  showCancelDeleteAlert,
  showConfirmDeleteAlert,
} from "./services/alertService";