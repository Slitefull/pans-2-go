import React, { useCallback, useMemo, useState } from 'react';
import moment from "moment";
import { observer } from "mobx-react";
import AddServiceModal from "@/admin/edit-car/view/tabs/maintenance/add-service-modal/add-service-modal.component";
import Table from "@/ui-kit/components/table/table.component";
import { Button } from "@/ui-kit/components/button/button.component";
import CustomSelect from "@/ui-kit/components/select/select.component";
import { injector } from "@/common/injector/Injector";
import { EDIT_CAR_SERVICE } from "@/common/injector/constants";
import { EditCarService } from "@/admin/edit-car/domain/edit-car.service";
import PlusIcon from "@/ui-kit/customized-icons/plus/plus.component";
import { TypesOfServiceSelectValues, TypesOfServiceValues } from '@/common/constants/typesOfService';
import { Cell } from "react-table";
import {
  FilesDropzoneUploaderMinimized
} from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import TableOptions from "@/ui-kit/components/scrolable-table/options/options.component";
import { MaintenanceDTO } from "@/admin/edit-car/api/dto/edit-car.dto";

import "./maintenance-tab.styles.scss";


interface ReservationOption {
  key: string;
  label: string;
  handler: (id: string) => void;
}

const MaintenanceTab = observer(() => {
  const editCarService: EditCarService = injector.get(EDIT_CAR_SERVICE);
  const [isCloseOptions, setIsCloseOptions] = useState<boolean>(false);

  const data = useMemo(() => editCarService.filteredMaintenance,
    [editCarService.filteredMaintenance, editCarService.maintenance]
  );

  const options: Array<ReservationOption> = [
    {
      key: 'view',
      label: 'View',
      handler: (id: string) => onViewMaintenanceHandler(id),
    },
    {
      key: 'delete',
      label: 'Delete',
      handler: (id: string) => onDeleteMaintenanceHandler(id),
    }
  ]

  const columns = useMemo(() => [
    {
      id: 'typeOfService',
      Header: 'Service',
      accessor: (row: MaintenanceDTO) => row.typeOfService,
      style: {
        width: '100%',
      },
    },
    {
      id: 'odometer',
      Header: 'Odometer',
      accessor: (row: MaintenanceDTO) => row.odometer,
      style: {
        width: '100%',
      },
    },
    {
      id: 'date',
      Header: 'Date',
      accessor: (row: MaintenanceDTO) => row.date,
      style: {
        width: '100%',
      },
      Cell: ({ row }: Cell) => <p>{moment(row.values.date).format('lll')}</p>
    },
    {
      id: 'comment',
      Header: 'Comment',
      accessor: 'comment',
      style: {
        width: '100%'
      }
    },
    {
      id: 'media',
      Header: 'File',
      accessor: (row: MaintenanceDTO) => row.media === null ? "no thing" : row.media,
      style: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
      },
      Cell: ({ row }: Cell) => row.values.media
        ? <FilesDropzoneUploaderMinimized
          label={"Files"}
          defaultFiles={[row.values.media]}
          isHideUploader
        />
        : null
    },
    {
      id: 'id',
      Header: '',
      accessor: (row: MaintenanceDTO) => row.id,
      style: {
        width: '150px'
      },
      Cell: ({ row }: Cell) => <TableOptions
        options={options}
        selectedRow={row}
        isClose={isCloseOptions}
      />
    },
  ], [isCloseOptions])

  const onChangeServiceTypeHandler = useCallback((serviceType: TypesOfServiceValues) => {
    editCarService.filterMaintenanceByServiceType(serviceType)
  }, [editCarService])

  const onAddServiceHandler = useCallback(() => {
    editCarService.isOpenAddServiceModal = true;
  }, [editCarService])

  const onViewMaintenanceHandler = useCallback((id: string) => {
    editCarService.selectedMaintenanceId = id;
    editCarService.isOpenAddServiceModal = true;
    setIsCloseOptions(true);
  }, [editCarService])

  const onDeleteMaintenanceHandler = useCallback((id: string) => {
    editCarService.deleteMaintenanceElementById(id);
    setIsCloseOptions(true);
  }, [editCarService])

  return (
    <>
      <div className="maintenance">
        <div className="maintenance__header">
          <CustomSelect
            className="maintenance__select"
            options={TypesOfServiceSelectValues}
            onChange={onChangeServiceTypeHandler}
          />
          <Button
            color="primary"
            onClick={onAddServiceHandler}
            customizedIcon={<PlusIcon size={15} color="#FFFFFF"/>}
          >
            ADD SERVICE
          </Button>
        </div>
        {/* @ts-ignore */}
        <Table columns={columns} data={data}/>
      </div>
      {editCarService.isOpenAddServiceModal && <AddServiceModal/>}
    </>
  );
});

export default MaintenanceTab;
