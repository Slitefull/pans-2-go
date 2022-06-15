import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import { toJS } from "mobx";
import moment from "moment";
import { observer } from "mobx-react";
import { AuthService } from "@/common/auth/domain/auth.service";
import { injector } from "@/common/injector/Injector";
import { AUTH_SERVICE, CARS_SERVICE, DASHBOARD_SERVICE } from "@/common/injector/constants";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import CustomTimeline from "@/ui-kit/components/charts/timeline/timeline.component";
import Search from "@/ui-kit/components/filters/search/search.component";
import SelectFilter from "@/ui-kit/components/filters/select/select.component";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { BodyTypes } from "@/common/constants/bodyTypes";
import CustomDatepicker from "@/ui-kit/components/datepicker/datepicker.component";
import InfoCard from "@/admin/dashboard/view/components/info-card/info-card.component";
import TimelineTitle from "@/ui-kit/components/charts/timeline/title/title.component";
import { DashboardService } from "@/admin/dashboard/domain/dashboard.service";
import Line, { DashboardLineAlign } from "@/ui-kit/components/charts/timeline/line/line.component";
import { BusyTimeElement } from "@/admin/dashboard/api/dto/dashboard.dto";
import { getTimeRange } from "@/admin/dashboard/view/helpers/getTimeRange.helper";
import { getPercentage } from "@/admin/dashboard/view/helpers/getPercent.helper";
import { isLastElement } from "@/admin/dashboard/view/helpers/isLastElement.helper";

import './dashboard.styles.scss';


type Time = { [key: number]: ReactNode | undefined }

type BusyCar = { [key: string]: Array<BusyTimeElement> }

interface SelectOption<L = string, V = string> {
  label: L;
  value: V;
}

interface Column<H = string, A = string> {
  Header: H;
  accessor: A;
}

interface DataElement {
  title: ReactNode;
  busyTime: Time;
}

const TOKEN_NAME = "token";

const Dashboard = observer(() => {
  const authService: AuthService = injector.get(AUTH_SERVICE);
  const carsService: CarsService = injector.get(CARS_SERVICE);
  const dashboardService: DashboardService = injector.get(DASHBOARD_SERVICE);

  const cars = dashboardService.cars;
  const token = new URLSearchParams(window.location.search).get(TOKEN_NAME);
  const busyCars: Array<BusyCar> = cars.map((car) => ({ [`${car.title} ${car.plateNumber}`]: toJS(car.busyTime) }));

  const getAlign = (element: string, array: Array<string>): DashboardLineAlign => element === array[0] ? DashboardLineAlign.Right : DashboardLineAlign.Left;

  const getPercentageLine = (element: string, array: Array<string>, startMinutes: number, endMinutes: number): number | undefined => {
    if (element === array[0]) {
      if (startMinutes == 0) return 100;
      return getPercentage(startMinutes, 60);
    }
    if (isLastElement(element, array)) {
      if (endMinutes == 0) return 100;
      return getPercentage(endMinutes, 60);
    }

    return undefined;
  }

  const getBusyTime = (busyTimes: Array<BusyTimeElement>): Time | undefined => {
    if (!busyTimes.length) return;
    let time = {};

    busyTimes.forEach(element => {
      const { start, end } = element;
      const { hours, startMinutes, endMinutes } = getTimeRange(moment(start), moment(end));

      hours.forEach((hour) => {
        time = {
          ...time, [hour]: <Line
            align={getAlign(hour, hours)}
            width={getPercentageLine(hour, hours, startMinutes, endMinutes)}
          />
        }
      })
    })

    return time;
  }

  const prepareArrayForTableData = (busyTime: Array<BusyCar>) => {
    return busyTime.map((car) => {
      return Object.entries(car).map((el) => ({
        title: el[0],
        busyTime: el[1],
      }));
    }).flat()
  }

  const prepareData = (busyTime: Array<BusyCar>): Array<DataElement | {}> => {
    const newArr = prepareArrayForTableData(busyTime);

    return newArr.map((car) => {
      const titleArr = car.title.split(' ');
      const plateNumber = titleArr[titleArr.length - 1];
      const carTitle = titleArr.filter((element, index) => index < titleArr.length - 1).join(' ');

      return {
        title: <TimelineTitle title={carTitle} additionalText={plateNumber}/>,
        busyTime: getBusyTime(car.busyTime)
      }
    });
  }

  const data: Array<DataElement | {}> = useMemo(() => prepareData(busyCars), [busyCars]);

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: '',
        accessor: 'title',
      },
      {
        Header: '12AM',
        accessor: 'busyTime.24',
      },
      {
        Header: '1AM',
        accessor: 'busyTime.1',
      },
      {
        Header: '2AM',
        accessor: 'busyTime.2',
      },
      {
        Header: '3AM',
        accessor: 'busyTime.3',
      },
      {
        Header: '4AM',
        accessor: 'busyTime.4',
      },
      {
        Header: '5AM',
        accessor: 'busyTime.5',
      },
      {
        Header: '6AM',
        accessor: 'busyTime.6',
      },
      {
        Header: '7AM',
        accessor: 'busyTime.7',
      },
      {
        Header: '8AM',
        accessor: 'busyTime.8',
      },
      {
        Header: '9AM',
        accessor: 'busyTime.9',
      },
      {
        Header: '10AM',
        accessor: 'busyTime.10',
      },
      {
        Header: '11AM',
        accessor: 'busyTime.11',
      },
      {
        Header: '12PM',
        accessor: 'busyTime.12',
      },
      {
        Header: '1PM',
        accessor: 'busyTime.13',
      },
      {
        Header: '2PM',
        accessor: 'busyTime.14',
      },
      {
        Header: '3PM',
        accessor: 'busyTime.15',
      },
      {
        Header: '4PM',
        accessor: 'busyTime.16',
      },
      {
        Header: '5PM',
        accessor: 'busyTime.17',
      },
      {
        Header: '6PM',
        accessor: 'busyTime.18',
      },
      {
        Header: '7PM',
        accessor: 'busyTime.19',
      },
      {
        Header: '8PM',
        accessor: 'busyTime.20',
      },
      {
        Header: '9PM',
        accessor: 'busyTime.21',
      },
      {
        Header: '10PM',
        accessor: 'busyTime.22',
      },
      {
        Header: '11PM',
        accessor: 'busyTime.23',
      },
    ],
    []
  )

  const carTypes: Array<SelectOption<BodyTypes> | any> = carsService.carsCategories.map((category) => ({
    label: category.title,
    value: category.id,
  }))

  const onSearchHandler = useCallback((event) => {
    dashboardService.searchName = event.target.value;
    dashboardService.getBusyCars({});
  }, [])

  const onChangeCarTypeHandler = useCallback((categoryId: string) => {
    dashboardService.getBusyCars({ category: categoryId });
  }, [])

  const onChangeDateHandler = useCallback((date: Date) => {
    dashboardService.selectedDate = date.toDateString();
    dashboardService.getBusyCars({});
  }, [dashboardService])

  useEffect(() => {
    carTypes.unshift({ label: 'All car types', value: null });
  }, [carTypes])

  useEffect(() => {
    if (token) authService.userActivation(token);
    if (!carsService.carsCategories.length) {
      carsService.getAllCategories();
    }
    dashboardService.getBusyCars({});
  }, [])

  return (
    <PageWrapper title="Dashboard" withSidebar>
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header__section">
            <Search
              classPrefix="option search-name"
              onChangeHandler={onSearchHandler}
            />
            <SelectFilter
              classPrefix="option"
              options={carTypes}
              height={40}
              onChangeHandler={(category) => onChangeCarTypeHandler(category.value)}
            />
            <CustomDatepicker
              classPrefix="option"
              selected={new Date(dashboardService.selectedDate)}
              onChangeHandler={onChangeDateHandler}
              placeholderText="Choose date"
              isShowTimeSelect={false}
              dateFormat={'MMM, dd yyyy'}
            />
          </div>
          <div className="dashboard-header__section">
            <InfoCard text={`${dashboardService.reservationsCount} Reservations`}/>
            <InfoCard text={`${dashboardService.freeCarsCount} Free cars`}/>
          </div>
        </div>
        <CustomTimeline columns={columns} data={data}/>
      </div>
    </PageWrapper>
  );
});

export default Dashboard;
