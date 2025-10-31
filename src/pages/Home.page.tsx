import { useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Flex, Text, Title } from '@mantine/core';

interface Task {
  id: string;
  content: string;
}

const SortableTask = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: 'grab',
  };

  return (
    <Card ref={setNodeRef} {...attributes} {...listeners} mt="sm" style={style}>
      <Text>{task.content}</Text>
    </Card>
  );
};

const TaskCard = ({ task }: { task: Task }) => (
  <Card shadow="sm" mt="sm" style={{ cursor: 'grabbing' }}>
    <Text>{task.content}</Text>
  </Card>
);

const DroppableColumn = ({ id, title, tasks }: { id: string; title: string; tasks: Task[] }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
      <Flex
        ref={setNodeRef}
        direction="column"
        style={{
          width: 300,
          minHeight: 400,
          background: isOver ? 'var(--mantine-color-blue-0)' : 'var(--mantine-color-gray-0)',
          borderRadius: 12,
          padding: 16,
          transition: 'background 0.2s ease',
        }}
      >
        <Title order={4} mb="md">
          {title}
        </Title>

        {tasks.map((task) => (
          <SortableTask key={task.id} task={task} />
        ))}
      </Flex>
    </SortableContext>
  );
};

export default function NotionLikeTodo() {
  const [columns, setColumns] = useState({
    new: [
      { id: '1', content: 'UI dizayn qilish' },
      { id: '2', content: 'API yozish' },
    ],
    processing: [{ id: '3', content: 'Test qilish' }],
    completed: [{ id: '4', content: 'Yakunlash' }],
  });

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const container = findContainer(active.id as string);
    if (container) {
      const task = columns[container].find((t) => t.id === active.id);
      setActiveTask(task || null);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string) || (over.id as keyof typeof columns);

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setColumns((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeItem = activeItems.find((i) => i.id === active.id);
      if (!activeItem) return prev;

      return {
        ...prev,
        [activeContainer]: activeItems.filter((i) => i.id !== active.id),
        [overContainer]: [...overItems, activeItem],
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const items = columns[activeContainer];
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      if (oldIndex !== newIndex) {
        const newItems = arrayMove(items, oldIndex, newIndex);
        setColumns({ ...columns, [activeContainer]: newItems });
      }
    }
  };

  const findContainer = (id: string): keyof typeof columns | null => {
    if (id in columns) return id as keyof typeof columns;
    if (columns.new.some((i) => i.id === id)) return 'new';
    if (columns.processing.some((i) => i.id === id)) return 'processing';
    if (columns.completed.some((i) => i.id === id)) return 'completed';
    return null;
  };

  const columnOrder: (keyof typeof columns)[] = ['new', 'processing', 'completed'];
  const titles = {
    new: 'LEADS',
    processing: 'EXPECTATION',
    completed: 'SET',
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Flex direction="row" align="start" justify="center" gap="lg" p="xl">
        {columnOrder.map((colKey) => (
          <DroppableColumn
            key={colKey}
            id={colKey}
            title={titles[colKey]}
            tasks={columns[colKey]}
          />
        ))}
      </Flex>

      <DragOverlay>{activeTask ? <TaskCard task={activeTask} /> : null}</DragOverlay>
    </DndContext>
  );
}
